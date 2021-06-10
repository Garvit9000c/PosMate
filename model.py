import pickle
from sklearn.neighbors import KNeighborsClassifier
import math 

Nearest = pickle.load(open('./model/Nearest.sav', 'rb'))

def slope(p1,p2):
  dy=p1['y']-p2['y']
  dx=p1['x']-p2['x']
  return dy/dx

def dis(p1,p2):
  dy=(p1['y']-p2['y'])**2
  dx=(p1['x']-p2['x'])**2
  return dy+dx
  
def angle(m1,m2):
  val=(m1-m2)/(1+(m1*m2))
  if val<0:
    val=val*(-1)
  val=math.degrees(math.atan(val))
  return val
 
def render(l):
  dist=(dis(l['1'],l['2'])/dis(l['5'],l['6']))*100
  print(dist)
  m1=slope(l['5'],l['6'])
  #m2=slope(l['5'],l['3'])
  #m3=slope(l['6'],l['4'])
  m4=slope(l['5'],l['0'])
  m5=slope(l['6'],l['0'])
  #alpha=angle(m1,m2)
  #beta=angle(m1,m3)
  gama1=angle(m4,m1)
  gama2=angle(m5,m1)
  #Input=[alpha/180,beta/180,(180-gama1-gama2)/180]
  gama=(180-gama1-gama2)/180
  if dist>7:
    return 1,2
  elif gama>0.55:
    return 1,1
  else:
    return 0,0
