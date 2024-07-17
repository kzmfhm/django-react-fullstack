from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("items/", views.ItemListCreate.as_view(), name="item-list"),
    path("items/delete/<int:pk>/", views.ItemDelete.as_view(), name="delete-item"),  
]
