from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
import datetime


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Cleared existing data.')

        # Create users (superheroes)
        users = [
            User(email='ironman@avengers.com', name='Tony Stark', team='marvel', is_active=True),
            User(email='blackwidow@avengers.com', name='Natasha Romanoff', team='marvel', is_active=True),
            User(email='spiderman@avengers.com', name='Peter Parker', team='marvel', is_active=True),
            User(email='batman@jla.com', name='Bruce Wayne', team='dc', is_active=True),
            User(email='wonderwoman@jla.com', name='Diana Prince', team='dc', is_active=True),
            User(email='superman@jla.com', name='Clark Kent', team='dc', is_active=True),
        ]
        for user in users:
            user.save()
        self.stdout.write(f'Created {len(users)} users.')

        # Create teams
        marvel = Team(name='marvel', members=['Tony Stark', 'Natasha Romanoff', 'Peter Parker'])
        marvel.save()
        dc = Team(name='dc', members=['Bruce Wayne', 'Diana Prince', 'Clark Kent'])
        dc.save()
        self.stdout.write('Created 2 teams: marvel, dc.')

        # Create activities
        activities = [
            Activity(user='Tony Stark', type='flight training', duration=60, date=datetime.date(2026, 3, 10)),
            Activity(user='Natasha Romanoff', type='combat training', duration=90, date=datetime.date(2026, 3, 11)),
            Activity(user='Peter Parker', type='web slinging', duration=45, date=datetime.date(2026, 3, 12)),
            Activity(user='Bruce Wayne', type='martial arts', duration=120, date=datetime.date(2026, 3, 10)),
            Activity(user='Diana Prince', type='sword training', duration=75, date=datetime.date(2026, 3, 11)),
            Activity(user='Clark Kent', type='super speed run', duration=30, date=datetime.date(2026, 3, 12)),
        ]
        for activity in activities:
            activity.save()
        self.stdout.write(f'Created {len(activities)} activities.')

        # Create leaderboard
        leaderboard = [
            Leaderboard(team='marvel', points=320),
            Leaderboard(team='dc', points=290),
        ]
        for entry in leaderboard:
            entry.save()
        self.stdout.write('Created leaderboard entries.')

        # Create workouts
        workouts = [
            Workout(name='Arc Reactor Cardio', description='High-intensity cardio inspired by Iron Man', difficulty='hard'),
            Workout(name='Black Widow Agility', description='Agility and flexibility training', difficulty='medium'),
            Workout(name='Spider Strength', description='Bodyweight strength training', difficulty='medium'),
            Workout(name='Dark Knight HIIT', description='Batman-style high-intensity interval training', difficulty='hard'),
            Workout(name='Amazonian Warrior', description='Wonder Woman inspired strength and combat training', difficulty='hard'),
            Workout(name='Super Speed Drill', description='Sprint intervals and speed endurance', difficulty='easy'),
        ]
        for workout in workouts:
            workout.save()
        self.stdout.write(f'Created {len(workouts)} workouts.')

        self.stdout.write(self.style.SUCCESS('Successfully populated the octofit_db database with superhero test data!'))
