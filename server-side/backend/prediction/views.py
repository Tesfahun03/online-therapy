import numpy as np
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from prediction.Models.ml_model import model

from core.models import Patient
from .models import PredictedValues

from .serializers import PredictionSerializer, PredictedValueSerializer
# Create your views here.


class PredictDisorder(APIView):
    def post(self, request, user_id, *args, **kwargs):
        serializer = PredictionSerializer(data = request.data)

        if serializer.is_valid():

            try:

                patient = Patient.objects.select_related('profile').get(profile__user_id = user_id)
                print('the patient that is returned is ', patient)
            except Patient.DoesNotExist:
                return Response({'error':'patient does not exist check user_id in the url'}, status=status.HTTP_400_BAD_REQUEST)
            
            
            data = serializer.validated_data
            print("serializer.valideted data is", data)
            input_data = np.array([[
                data['age'],  data['q1'],  data['q2'], data['q3'], data['q4'], data['q5'],
                data['q6'],  data['q7'], data['q8'], data['q9'], data['q10'],
                data['q11'], data['q12'], data['q13'], data['q14'], data['q15'],
                data['q16'], data['q17'], data['q18'], data['q19'], data['q20'],
                data['q21'], data['q22'], data['q23'], data['q24'], data['q25'],
                data['q26'], data['q27']
            ]], dtype=object) 
           
            prediction = model.predict(input_data)
            res = model.predict_proba(input_data)
            print(res)
            result = prediction[0]
            patient.prediction_result = result

            predicted_value = PredictedValues(patient = patient, predicted_result = result)
            predicted_value.save()
            patient.save()
# 'WITH PROBABILITY OF: ': res
        

            return Response({'prediction ': result }, status = status.HTTP_200_OK )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class PredictedValueViews(APIView):
    def get(self, request, user_id, *args, **kwargs):
        patient = Patient.objects.select_related('profile').get(profile__user_id = user_id)
        result_list = PredictedValues.objects.filter(patient = patient).order_by('-predicted_at')
        serializer = PredictedValueSerializer(result_list, many = True)
        return Response(serializer.data)
