#Trained coordinates dictionary to store formatted trained coordinates 
KEYPOINT_TRAINED_COORDINATES_RANGE={
    0:{},
    1:{},
    2:{},
    3:{},
    4:{},
    5:{},
    6:{},
    'dist_between_eyes':[]
}

#Received coordinates dictionary to store formatted received coordinates
KEYPOINT={
    0:{},
    1:{},
    2:{},
    3:{},
    4:{},
    5:{},
    6:{}
}

#To format received coordinates
def keyCoordinates_process(keypoints):
    for key in KEYPOINT.keys():
        KEYPOINT[key]['x']=keypoints[key][0]
        KEYPOINT[key]['y']=keypoints[key][1]
    return KEYPOINT
  
#To format trained coordinates
def trainCoordinates_process(train):
    for key in KEYPOINT_TRAINED_COORDINATES_RANGE.keys():
        if key=='dist_between_eyes':
            break
        x=[]
        y=[]
        for i in train:
            x+=[i[key][0]]
            y+=[i[key][1]]
        KEYPOINT_TRAINED_COORDINATES_RANGE[key]['x']=[min(x)-(min(x)*0.1),max(x)+(max(x)*0.1)]
        KEYPOINT_TRAINED_COORDINATES_RANGE[key]['y']=[min(y)-(min(y)*0.1),max(y)+(max(y)*0.1)]

    dist_between_eyes=(((KEYPOINT_TRAINED_COORDINATES_RANGE[1]['x'][1]-KEYPOINT_TRAINED_COORDINATES_RANGE[2]['x'][1])**2)+((KEYPOINT_TRAINED_COORDINATES_RANGE[1]['y'][1]-KEYPOINT_TRAINED_COORDINATES_RANGE[2]['y'][1])**2))**0.5
    KEYPOINT_TRAINED_COORDINATES_RANGE['dist_between_eyes'].append(dist_between_eyes-(dist_between_eyes*0.20))
    KEYPOINT_TRAINED_COORDINATES_RANGE['dist_between_eyes'].append(dist_between_eyes+(dist_between_eyes*0.20))

    return KEYPOINT_TRAINED_COORDINATES_RANGE

#to check posture and return wrong posture counter value, correct posture counter value and pose label key
def Posture(trained_coordinates,keypoints):
    keypoints=keyCoordinates_process(keypoints)
    flag=True
    dist_between_eyes=(((keypoints[1]['x']-keypoints[2]['x'])**2)+((keypoints[1]['y']-keypoints[2]['y'])**2))**0.5
    print(dist_between_eyes)
    if dist_between_eyes<trained_coordinates['dist_between_eyes'][0]:
        return 3
    elif dist_between_eyes>trained_coordinates['dist_between_eyes'][1]:
        return 2
    else:
        for key in keypoints.keys():
            if keypoints[key]['x']<trained_coordinates[key]['x'][0] or keypoints[key]['x']>trained_coordinates[key]['x'][1] or keypoints[key]['y']<trained_coordinates[key]['y'][0] or keypoints[key]['y']>trained_coordinates[key]['y'][1]:
                flag=False
            else:
                flag=True
        if flag==False:
            return 1
    return 0

import time
def btfunc(start_time):
    current_time=time.time()
    if start_time==None:
        return False,current_time
    else:
        if (current_time-start_time>600):
            return True,(current_time+60)
        elif (current_time-start_time<-10):
            return 'break',start_time
        elif (current_time-start_time<0):
            return 'start',start_time
        else:
            return False,start_time
