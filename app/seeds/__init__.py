from flask.cli import AppGroup
from .users import seed_users, undo_users
from .events import seed_events, undo_events
from .reviews import seed_reviews, undo_reviews
from .eventphotos import seed_eventphotos, undo_eventphotos
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_events()
    seed_reviews()
    seed_eventphotos()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_events()
    seed_events()
    undo_eventphotos()
    # Add other undo functions here
