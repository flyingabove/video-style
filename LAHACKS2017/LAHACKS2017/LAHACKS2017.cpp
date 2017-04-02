#include "stdafx.h"
#include <stdio.h>
#include <iostream>
#include <vector>
#include "opencv2/core/core.hpp"
#include "opencv2/features2d/features2d.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/nonfree/nonfree.hpp"

using namespace cv;
using namespace std;

int main(int argc, char** argv)
{
		float max = 0;
		int maxIndex = 0;
		Mat img1 = imread(argv[1], CV_LOAD_IMAGE_GRAYSCALE);
		Mat img2 = imread(argv[2], CV_LOAD_IMAGE_GRAYSCALE);
		if (img1.empty() || img2.empty())
		{
			printf("Can't read one of the images\n");
			return -1;
		}

		// detecting keypoints
		SurfFeatureDetector detector(1300);
		vector<KeyPoint> keypoints1, keypoints2;
		detector.detect(img1, keypoints1);
		detector.detect(img2, keypoints2);

		// computing descriptors
		SurfDescriptorExtractor extractor;
		Mat descriptors1, descriptors2;
		extractor.compute(img1, keypoints1, descriptors1);
		extractor.compute(img2, keypoints2, descriptors2);

		// matching descriptors
		FlannBasedMatcher matcher;
		vector<vector<DMatch>> matches;
		matcher.knnMatch(descriptors1, descriptors2, matches, 2);

		vector<DMatch> good_matches;
		good_matches.reserve(matches.size());
		float nndrRatio = 0.70f;
		float total = 0;
		for (size_t i = 0; i < matches.size(); ++i)
		{
			if (matches[i].size() < 2)
				continue;

			const DMatch &m1 = matches[i][0];
			const DMatch &m2 = matches[i][1];

			if (m1.distance <= nndrRatio * m2.distance) {
				good_matches.push_back(m1);
				total += m1.distance;
			}

		
	cout << total << endl;
	
	return 0;
}
