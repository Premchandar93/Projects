import numpy as np
import pandas as pd
from sklearn import svm

from sklearn.externals import joblib
import pickle

import matplotlib.pyplot as plt
import seaborn as sns; sns.set(font_scale=1.2)

%matplotlib inline

recipes = pd.read_csv('mycsv.csv')
#print(recipes.head())

#sns.lmplot('thriller','drama', data=recipes, hue='interested', palette='Set1', fit_reg=False, scatter_kws={"s":70})

type_label=np.where(recipes['INTERESTED']==0,0,1)
#print(type_label)
recipe_features=recipes.columns.values[1:].tolist()
#recipe_features

ingredients=recipes[recipe_features].values
print(ingredients)

model=svm.SVC(kernel='linear', probability=True)
model.fit(ingredients,type_label)

w=model.coef_[0]
a=-w[0]/w[1]
xx=np.linspace(30,60)
yy=a*xx-(model.intercept_[0])/w[1]
#print(yy)


b=model.support_vectors_[0]
yy_down=a*xx + (b[1] - a*b[0])
b=model.support_vectors_[-1]
yy_up=a*xx+(b[1] -a*b[0])

#sns.lmplot('thriller','drama',data=recipes,hue='interested',palette='Set1', fit_reg=False, scatter_kws={"s":70})
#plt.plot(xx,yy, linewidth=2,color='black')
#plt.plot(xx,yy_down,'k--')
#plt.plot(xx,yy_up,'k--')




#print(model)

#sns.lmplot('thriller','drama',data=recipes,hue='interested',palette='Set1', fit_reg=False, scatter_kws={"s":70})
#sns.lmplot('thriller','comedy',data=recipes,hue='interested',palette='Set1', fit_reg=False, scatter_kws={"s":70})
#sns.lmplot('comedy','drama',data=recipes,hue='interested',palette='Set1', fit_reg=False, scatter_kws={"s":70})
plt.plot(xx,yy, linewidth=2,color='black')


pkl_filename = "pickle_model.pkl"  
with open(pkl_filename, 'wb') as file:  
    pickle.dump(model, file,  protocol=2)


#pkl_filename = 'final_model.pkl'

#model_pkl = open(pkl_filename, 'wb')
#pickle.dump(model, model_pkl)

joblib.dump(model, 'mymodel.joblib')



model_pkl.close()



def interestedornot(list):
    #plt.plot(,drama,'yo', markersize='9')
    result = model.predict([[list[0],list[1],list[2],list[3],list[4],list[5],list[6],list[7],list[8],list[9],list[10],list[11],list[12],list[13],list[14],list[15],list[16],list[17],list[18],list[19],list[20],list[21]]]);
    if(result==0):
        print("You won't be interested in this movie")
    else:
        print("You'll be intereseted in this movie " )
        print(model.predict_proba([[list[0],list[1],list[2],list[3],list[4],list[5],list[6],list[7],list[8],list[9],list[10],list[11],list[12],list[13],list[14],list[15],list[16],list[17],list[18],list[19],list[20],list[21]]]));
        print( result )
        
        
interestedornot([1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0])
