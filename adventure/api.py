from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
#from pusher import Pusher
from django.http import JsonResponse
from decouple import config
from django.contrib.auth.models import User
from .models import *
from rest_framework.decorators import api_view
import json

# ============ for rooms endpoint ============ 
from rest_framework import serializers, viewsets
from .models import Room
# ============================================

# instantiate pusher
#pusher = Pusher(app_id=config('PUSHER_APP_ID'), key=config('PUSHER_KEY'), secret=config('PUSHER_SECRET'), cluster=config('PUSHER_CLUSTER'))

"""
game_room_id = models.IntegerField(blank=True, null=True)
    title = models.CharField(max_length=50, default="DEFAULT TITLE")
    description = models.CharField(max_length=500, default="DEFAULT DESCRIPTION")
    coordinates = models.CharField(max_length=32, default="()")
    n_to = models.IntegerField(blank=True, null=True)
    s_to = models.IntegerField(blank=True, null=True)
    e_to = models.IntegerField(blank=True, null=True)
    w_to = models.IntegerField(blank=True, null=True)
    elevation = models.IntegerField(default=0)
    terrain = models.CharField(max_length=32, default="NORMAL")
    cooldown = models.IntegerField(blank=True, null=True)
"""

@csrf_exempt
@api_view(["POST"])
def post(request):
    newroom = Room.objects.create() 
    req = request.data
    newroom.game_room_id = reqroom_id
    newroom.title = req.title
    newroom.description = req.description
    newroom.coordinates = req.coordinates
    newroom.n_to = req.n_to
    newroom.s_to = req.s_to
    newroom.e_to = req.e_to
    newroom.w_to = req.w_to
    newroom.elevation = req.elevation
    newroom.terrain = req.terrain
    newroom.cooldown = req.cooldown
    newroom.save()
    return JsonResponse({"message":"Room Created"}, safe=True)


# ============ expose rooms model for rooms endpoint ============ 
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id','title', 'description', 'x', 'y', 'n_to', 's_to', 'e_to', 'w_to') 
    
class RoomViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.none()

    # filters view for user
    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Room.objects.none()
        else:
            return Room.objects.all()

# ============================================