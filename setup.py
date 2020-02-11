"""Setup mira 2020."""
from setuptools import find_packages, setup

setup(
    name='mira',
    version='1.0.0',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'gql==0.3.0',
        'flask==1.1.1',
    ],
)
