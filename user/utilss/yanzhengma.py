import random,base64
from PIL import Image,ImageFont,ImageDraw

# #生成随机字母
# def rndChar():
   #    print('sss')
#     return chr(random.randint(65,90))
#随机生成一个数字和字母

# image.show()
def setyzm():
    def getrand(num, many):  # num位数 many：个数
        for x in range(many):
            s = ''
            for i in range(num):
                n = random.randint(1, 2)  # 1生成数字 2 生成字母
                if n == 1:
                    numb = random.randint(0, 9)
                    s += str(numb)
                else:
                    nn = random.randint(1, 2)
                    cc = random.randint(1, 26)
                    if nn == 1:
                        numb = chr(64 + cc)
                    else:
                        numb = chr(96 + cc)
                    s += numb
        return s

    width = 60 * 4
    height = 60
    image = Image.new('RGB', (width, height), (255, 255, 255))
    # 穿件Font对象：选择文字大小和字体
    font = ImageFont.truetype('/root/minon/user/utilss/GABRIOLA.TTF', 50)
    # 创建draw对象
    draw = ImageDraw.Draw(image)

    def rndColor():
        return (random.randint(64, 255), random.randint(64, 126), random.randint(64, 126), random.randint(64, 126))

    def rndColor1():
        return (random.randint(127, 255), random.randint(127, 255), random.randint(127, 255), random.randint(127, 255))

    # 填充每个像素：
    for x in range(width):
        for y in range(height):
            draw.point((x, y), fill=rndColor1())

    # 输出文字
    a = []
    for t in range(4):
        a.append(getrand(1, 4))
        draw.text((60 * t + 10, 10), a[t], font=font, fill=rndColor())
    image.save('code.png','png')
    with open('code.png','rb') as f:
        data=base64.b64encode(f.read()).decode()
        # print(data)
    print('dayin')
    return a,data

