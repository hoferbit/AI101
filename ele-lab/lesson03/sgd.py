from ctypes import wstring_at
import dataset
import matplotlib.pyplot as plt
import numpy as np

xs,ys = dataset.get_beans(100)

# draw picture
plt.title("Size-Toxicity Relation",fontsize=12)
plt.xlabel("Bean Size")
plt.ylabel("Toxicity")

plt.scatter(xs,ys)

w = 0.1
y_pre = w*xs

plt.plot(xs,y_pre)

plt.show()

for _ in range(100):
    for i in range(100):
        x = xs[i]
        y = ys[i]
        #a=x^2
        #b=-2*x*y
        #c=y^2
        #斜率k=2aw+b
        k = 2*(x**2)*w + (-2*x*y)
        alpha = 0.1
        w = w - alpha*k
        plt.clf()
        plt.scatter(xs,ys)
        y_pre = w*xs
        plt.xlim(0,1)
        plt.ylim(0,1.2)
        plt.plot(xs,y_pre)
        plt.pause(0.01)

# re draw
# plt.scatter(xs,ys)
# y_pre = w*xs
# plt.plot(xs,y_pre)

# plt.show()