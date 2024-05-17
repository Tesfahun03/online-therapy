# Generated by Django 4.0.1 on 2024-05-07 14:02

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChapaTransactions',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('amount', models.FloatField()),
                ('currency', models.CharField(default='ETB', max_length=25)),
                ('payment_title', models.CharField(default='Payment', max_length=255)),
                ('description', models.TextField()),
                ('status', models.CharField(choices=[('created', 'CREATED'), ('pending', 'PENDING'), ('success', 'SUCCESS'), ('failed', 'FAILED')], default='created', max_length=50)),
                ('response_dump', models.JSONField(blank=True, default=dict)),
                ('checkout_url', models.URLField(blank=True, null=True)),
                ('patient', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.patient')),
                ('therapist', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.therapist')),
            ],
        ),
        migrations.CreateModel(
            name='ChapaTransaction',
            fields=[
                ('id', models.CharField(default=1, max_length=100, primary_key=True, serialize=False)),
                ('patients_id', models.IntegerField(null=True)),
                ('therapists_id', models.IntegerField(null=True)),
                ('amount', models.FloatField()),
                ('currency', models.CharField(default='ETB', max_length=25)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('phone_number', models.CharField(blank=True, max_length=25)),
                ('first_name', models.CharField(blank=True, max_length=50)),
                ('last_name', models.CharField(blank=True, max_length=50)),
                ('payment_title', models.CharField(default='Payment', max_length=255)),
                ('description', models.TextField(blank=True)),
                ('status', models.CharField(choices=[('created', 'CREATED'), ('pending', 'PENDING'), ('success', 'SUCCESS'), ('failed', 'FAILED')], default='created', max_length=50)),
                ('response_dump', models.JSONField(blank=True, default=dict)),
                ('checkout_url', models.URLField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(null=True)),
                ('patient', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.patient')),
            ],
        ),
    ]
