from django.contrib import admin
from .models import User, UserPermission, Permission


class UserAdmin(admin.ModelAdmin):
    model = User
    list_display = ['id', 'email', 'first_name', 'last_name', 'email_confirmed', 'is_active']


class PermissionAdmin(admin.ModelAdmin):
    model = Permission
    list_display = ['id', 'name', 'description', 'is_active']


class UserPermissionAdmin(admin.ModelAdmin):
    model = UserPermission
    list_display = ['id', 'user_email', 'permission_name', 'is_active']

    def user_email(self, obj):
        return obj.user.email

    def permission_name(self, obj):
        return obj.permission.name


admin.site.register(User, UserAdmin)
admin.site.register(Permission, PermissionAdmin)
admin.site.register(UserPermission)
