
import datetime
def Time(hour, minute, second):
    # return f'{hour}:{minute}:{second}'
    return datetime.datetime(2010, 6, 15, hour, minute, second).strftime("%H:%M:%S")
print(Time(20, 10, 90))
