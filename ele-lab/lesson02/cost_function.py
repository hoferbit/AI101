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

es = (ys-y_pre)**2

sum_e = np.sum(es)

sum_e = (1/100)*sum_e

print(sum_e)

ws = np.arange(0,3,0.1)

es = []

for w in ws:
    y_pre = w*xs
    e = (1/100)*np.sum((ys-y_pre)**2)
    es.append(e)

# draw picture
plt.title("cost function",fontsize=18)
plt.xlabel("w")
plt.ylabel("e")
plt.plot(ws,es)
plt.show()


w_min = np.sum(xs*ys)/np.sum(xs*xs)
print("w_min = "+str(w_min))

y_pre = w_min*xs

# draw picture
plt.title("Size-Toxicity Relation",fontsize=12)
plt.xlabel("Bean Size")
plt.ylabel("Toxicity")

plt.scatter(xs,ys)
plt.plot(xs,y_pre)
plt.show()