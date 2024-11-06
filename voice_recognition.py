import speech_recognition as sr
import torch
import numpy as np

class VoiceInput:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        
    def listen(self):
        with sr.Microphone() as source:
            print("请说话...")
            audio = self.recognizer.listen(source)
            try:
                text = self.recognizer.recognize_google(audio, language='no-NO')
                return text
            except sr.UnknownValueError:
                return "抱歉，我没有听清楚 😕"
            except sr.RequestError:
                return "抱歉，语音服务暂时不可用 😔" 