#!/bin/sh

# Given this file structure:
# project101 - contains DICOM data folders for all studies
# project101/study-001 - a DICOM data folder
# project101/study-002 - another DICOM data folder
#
# These files and folders are built.
# project101/studyList.json - references to study json files in studies dir
# project101/studies - directory
# project101/studies/study-001.json - references to study-001 images
# project101/studies/study-002.json - references to study-002 images
# project101/make.studies.log
#
# Then cornerstone will be able to find and display those DICOM studies/images.
#

if [ -z "$1" ]; then
	echo Specify parent folder of DICOM data folders
	exit 1
fi
PROJECTS_HOME=`dirname $1`
PROJECT_DIR=`basename $1`
PROJECT_ID=$PROJECT_DIR
STUDY_LIST=studyList.json
STUDIES_DIR=studies
LOG=make.studies.log

#DCM2TXT=/opt/local/dcm4che-2.0.23/bin/dcm2txt
DCM2TXT=/Applications/cornerstone-index/dcm4che-3.3.7/bin/dcmdump
TMP_DICOM=tmp_dicom

ADD_COMMA="sed -i .bak -e \$s/\$/,/"
REMOVE_COMMA="sed -i .bak -e \$s/,\$//"

DEBUG_ECHO=echo # when debugging
DEBUG_ECHO=true # when not debugging

#
# -------------------------------------------------------------
# Start in the project directory 
# -------------------------------------------------------------
#
cd $PROJECTS_HOME/$PROJECT_DIR

#
# -------------------------------------------------------------
# If there is no studies directory, create that.
# -------------------------------------------------------------
#
if [ ! -d "$STUDIES_DIR" ]; then
	mkdir $STUDIES_DIR
fi

#
# -------------------------------------------------------------
# Starting to build the index files.
# -------------------------------------------------------------
#
touch $LOG
echo "`date` Starting" >> $LOG

#
# -------------------------------------------------------------
# Find all the study directories.
# That is, any top level directory with a dcm file below it.
# -------------------------------------------------------------
#
STUDIES=""
SUBDIRS=`ls -ld * | egrep -i "^d" | awk '{print $NF}'`
for SUBDIR in $SUBDIRS; do
	$DEBUG_ECHO "checking $SUBDIR"
	ANY_DCM_FILES=`find $SUBDIR -type f -name '*dcm' | head -1`
	if [ -n "$ANY_DCM_FILES" ]; then
		STUDIES=`echo $STUDIES $SUBDIR`
		echo "`date` found $SUBDIR with dcm files" >> $LOG
	fi
done
$DEBUG_ECHO $STUDIES

# 
# -------------------------------------------------------------
# Studylist header
# -------------------------------------------------------------
#
(
echo "{"
echo "	\"studyList\": ["
) > $STUDY_LIST

#
# -------------------------------------------------------------
# Studylist stanza for each study on this project
# -------------------------------------------------------------
#
echo
echo
echo
for DICOM_DIR in $STUDIES; do
	$DEBUG_ECHO $DICOM_DIR
	/bin/echo -n "$DICOM_DIR "

	#
	# Get a dicom file from the study to check for data
	#
	DICOM_FILE=`find $DICOM_DIR -type f -name '*dcm' | head -1`
	$DEBUG_ECHO $DICOM_FILE

	#
	# Get patient name
	# Get patient id
	# Get study date
	# Get modality
	# Get study description
	#
	$DCM2TXT "$DICOM_FILE" > $TMP_DICOM

	PATIENT_NAME=`cat $TMP_DICOM | egrep "(0010,0010)" | head -1 | cut -f2 -d'[' | cut -f1 -d']'`
	$DEBUG_ECHO Patient name $PATIENT_NAME

	PATIENT_ID=`cat $TMP_DICOM | egrep "(0010,0020)" | head -1 | cut -f2 -d'[' | cut -f1 -d']'`
	$DEBUG_ECHO Patient id $PATIENT_ID

	STUDY_DATE_YYYYMMDD=`cat $TMP_DICOM | egrep "(0008,0020)" | head -1 | cut -f2 -d'[' | cut -f1 -d']'`
	$DEBUG_ECHO Study date $STUDY_DATE_YYYYMMDD

	MODALITY=`cat $TMP_DICOM | egrep "(0008,0060)" | head -1 | cut -f2 -d'[' | cut -f1 -d']'`
	$DEBUG_ECHO Modality $MODALITY

	STUDY_DESCR=`cat $TMP_DICOM | egrep "(0008,1030)" | head -1 | cut -f2 -d'[' | cut -f1 -d']'`
	$DEBUG_ECHO Study description $STUDY_DESCR

	rm $TMP_DICOM

	#
	# Get number of images
	#
	NO_IMAGES=`find $DICOM_DIR -type f -print | wc -l`
	NO_IMAGES=`echo $NO_IMAGES + 0 | bc`
	$DEBUG_ECHO Number of images $NO_IMAGES
	/bin/echo -n "$NO_IMAGES "

	#
	# Reference json file for study
	# Comma after every stanza
	#
	(
	echo "		{"
        echo "		\"patientName\" : \"$PATIENT_NAME\","
        echo "		\"patientId\" : \"$PATIENT_ID\","
	echo "		\"studyDate\" : \"$STUDY_DATE_YYYYMMDD\","
	echo "		\"modality\" : \"$MODALITY\","
	echo "		\"studyDescription\" : \"$STUDY_DESCR\","
	echo "		\"numImages\" : $NO_IMAGES,"
	echo "		\"studyId\" : \"$DICOM_DIR\""
	echo "		},"
	) >>$STUDY_LIST

	#
	# Build study json file for each study.
	#
	STUDY_JSON="studies/$DICOM_DIR.json"

	#
	# Study json header
	#
	(
	echo "{"
	echo "	\"patientName\" : \"$PATIENT_NAME\","
	echo "	\"patientId\" : \"$PATIENT_ID\","
	echo "	\"studyDate\" : \"$STUDY_DATE_YYYYMMDD\","
	echo "	\"modality\" : \"$MODALITY\","
	echo "	\"studyDescription\" : \"$STUDY_DESCR\","
	echo "	\"numImages\" : \"$NO_IMAGES\","
	echo "	\"studyId\" : \"$DICOM_DIR\","
	echo "	\"seriesList\" : ["
	) > $STUDY_JSON

	#
	# -------------------------------------------------------------
	# Stanza for each series, listing image file instances
	# -------------------------------------------------------------
	#
	SERIES_NO=0
	SERIES_DIRS=`cd $DICOM_DIR; ls -d *`
	for SERIES_DIR in $SERIES_DIRS; do
		/bin/echo -n s

		#
		# Get a dicom file from this series to check for data
		#
		SERIES_DICOM_FILE=`find $DICOM_DIR/$SERIES_DIR -type f -name '*dcm' | head -1`

		#
		# Get the series description
		#
		SERIES_DESCR=`$DCM2TXT "$SERIES_DICOM_FILE" | egrep "(0008,103E)" | head -1 | cut -f2 -d'[' | cut -f1 -d']'`

		# 
		# Increment the series number
		#
		SERIES_NO=`echo $SERIES_NO + 1 | bc`

		#
		# Series header
		#
		(
		echo "		{"
		echo "			\"seriesDescription\": \"$SERIES_DESCR\","
		echo "			\"seriesNumber\": \"$SERIES_NO\","
		echo "			\"instanceList\": ["
		) >> $STUDY_JSON

		#
		# Line for each separate image file
		# xargs is a bit different under Mac
		#
		IMAGE_FNS=`find $DICOM_DIR/$SERIES_DIR -type f -print | xargs -L 1 -I \{} basename \{} | sort`
		for IMAGE_FN in $IMAGE_FNS; do
			/bin/echo -n .

			#
			# List each image filename, comma after every filename
			#
			echo "				{\"imageId\" : \"$PROJECT_ID/$DICOM_DIR/$SERIES_DIR/$IMAGE_FN\"}," >> $STUDY_JSON
		done

		#
		# Remove trailing comma on last file name
		#
		$REMOVE_COMMA $STUDY_JSON
		rm $STUDY_JSON.bak

		#
		# Series footer
		# Comma after every series
		#
		(
		echo "			]"
		echo "		},"
		) >> $STUDY_JSON

	# Continue building json for each series of this study.
	done

	#
	# Remove trailing comma on last series
	#
	$REMOVE_COMMA $STUDY_JSON
	rm $STUDY_JSON.bak

	#
	# Study json file footer
	#
	(
	echo "	]"
	echo "}"
	) >> $STUDY_JSON

	# Each line of progress characters ends at the end of the study.
	echo

# Continue building json for each study.
done

#
# Remove trailing comma on last study
#
$REMOVE_COMMA $STUDY_LIST
rm $STUDY_LIST.bak

#
# Studylist footer
#
(
echo "	]"
echo "}"
) >>$STUDY_LIST

echo "`date` Complete" >> $LOG

echo
echo Finished indexing for Cornerstone.
echo

osascript -e "display notification \"$PROJECT_DIR indexed\" with title \"cornerstone-index\""
