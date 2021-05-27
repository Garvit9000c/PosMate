#Dependencies
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import tensorflow as tf
import tensorflow_hub as hub
import time
# Dictionary that maps from joint names to keypoint indices.
KEYPOINT_DICT = {
    'nose': 0,
    'left_eye': 1,
    'right_eye': 2,
    'left_ear': 3,
    'right_ear': 4,
    'left_shoulder': 5,
    'right_shoulder': 6,
    'left_elbow': 7,
    'right_elbow': 8,
    'left_wrist': 9,
    'right_wrist': 10,
    'left_hip': 11,
    'right_hip': 12,
    'left_knee': 13,
    'right_knee': 14,
    'left_ankle': 15,
    'right_ankle': 16
}


#Loading Model
module = hub.load("https://tfhub.dev/google/movenet/singlepose/lightning/3")
#module=tf.saved_model.load('./model')
movenet=module.signatures['serving_default']
input_size = 192

#Function to Use Model
def Coordinate(filename):
  image_path = filename
  image = tf.io.read_file(image_path)
  image = tf.image.decode_jpeg(image)
  input_image = tf.expand_dims(image, axis=0)
  input_image = tf.cast(tf.image.resize_with_pad(input_image, input_size, input_size), dtype=tf.int32)
  outputs = movenet(input_image)
  keypoint_with_scores = outputs['output_0']
  keypoints=[]
  for i in keypoint_with_scores[0][0]:
    keypoints.append([float(i[0]),float(i[1])])
  return keypoints
