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
  #dist=dis(l['1'],l['2'])
  dist=dis(l['5'],l['6'])
  print(dist)
  #dis_lim=[15500,8000][l['7']]
  #max_lim=[2500,2000][l['7']]
  dis_lim=[140000,120000][l['7']]
  max_lim=[50000,34000][l['7']]
  alpha_lim=[0.1,0.07][l['7']]
  beta_lim=[95,95][l['7']]
  m0=slope(l['5'],l['6'])
  m1=slope(l['5'],l['0'])
  m2=slope(l['6'],l['0'])
  alpha=slope(l['5'],l['6'])
  if alpha <0:
    alpha*=-1
  gama1=angle(m1,m0)
  gama2=angle(m2,m0)
  beta=(180-gama1-gama2)
  if dist>dis_lim:
    return 2
  elif dist<max_lim:
    return 3
  elif alpha>alpha_lim or beta>beta_lim:
    return 1
  else:
    return 0
