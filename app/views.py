from rest_framework import viewsets
from django.shortcuts import render
from .serializer import ApplianceSerializer
from .models import Appliance

class ApplianceViewSet(viewsets.ModelViewSet):
    queryset = Appliance.objects.all()
    serializer_class = ApplianceSerializer

def home(request):
    return render(request, 'app/index.html')
