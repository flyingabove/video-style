from ffmpy import FFmpeg
from subprocess import call
import os
import shutil

#ffmpeg -i animedull.mp4 -ss 00:00:30.0 -c copy -t 00:00:10.0 oanimedullshort.mp4

#Clip File
ffClip = FFmpeg(
    inputs = {"animedull.mp4": None},
    outputs = {'animedullshort.mp4': "-ss 00:00:10.0 -c copy -t 00:00:10.0 -y"}
)

ffClip.run()

#Turns into images

shutil.rmtree("learn-nightwatch/test/e2e/images")
os.makedirs("learn-nightwatch/test/e2e/images")
ff = FFmpeg(
    inputs={'animedullshort.mp4': None},
    outputs={'learn-nightwatch/test/e2e/images/image%d.png': '-vf fps=4'}
)

ff.run()

ff = FFmpeg(
    inputs={'animedullshort.mp4': None},
    outputs={'learn-nightwatch/test/e2e/styles/style%d.png': '-vf fps=4'}
)

ff.run()

### Call Deep Learning

os.chdir("learn-nightwatch")

def selectFile(filename,stylename):


call(["npm test"],shell=True)




################
#Style to Movie#
################

#from ffmpy import FFmpeg

#os.chdir("../")
#os.chdir("styled")

#ffClipToVideo = FFmpeg(
#    inputs = {'out%d.png':'-r 4 -f image2 -s 1920x1080'},
#    outputs = {'final-output/test.mp4':'-vcodec libx264 -crf 15 -pix_fmt yuv420p -y'}
#)
#print(ffClipToVideo.cmd)
#ffClipToVideo.run()