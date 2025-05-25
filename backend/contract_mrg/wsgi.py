import sys
import os

sys.path.append(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'apps'))

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'contract_mrg.settings')

application = get_wsgi_application()