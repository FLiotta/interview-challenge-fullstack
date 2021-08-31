from rest_framework import permissions

class IsSafeMethodOrAdminRequest(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        elif request.user.is_staff or request.user.is_superuser:
            return True
        else:
            return False