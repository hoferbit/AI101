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
y_pre = w * xs
print(y_pre)

plt.plot(xs,y_pre)

plt.show()
