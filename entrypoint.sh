#!/bin/sh

cd src/
flask db upgrade
flask run -p 3001 -h 0.0.0.0
