import dataset
from matplotlib import pyplot as plt

xs,ys =dataset.get_beans(100)
print(xs)
print(ys)

plt.title("Size-Toxicity",fontsize=18)
plt.xlabel("Bean Size")
plt.ylabel("Toxicity")
plt.scatter(xs,ys)

w = 0.5

for i in range(100):
     x = xs[i]
     y = ys[i]
     y_pre = w * x
     e = y - y_pre
     alpha = 0.5
     w = w + alpha*e*x
         
y_pre = w * xs
print(y_pre)
print("w=",w)
plt.plot(xs,y_pre)

plt.show()
