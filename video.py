from ffmpy import FFmpeg

#ffmpeg -i animedull.mp4 -ss 00:00:30.0 -c copy -t 00:00:10.0 oanimedullshort.mp4


ffClip = FFmpeg(
    inputs = {"animedull.mp4": None},
    outputs = {'animedullshort.mp4': "-ss 00:00:10.0 -c copy -t 00:00:10.0 -y"}
)

ffClip.run()

ff = FFmpeg(
    inputs={'animedullshort.mp4': None},
    outputs={'output/out%d.png': '-vf fps=4'}
)


print(ff.cmd)

ff.run()