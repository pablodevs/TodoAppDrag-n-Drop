FROM python:3.8-alpine3.14

WORKDIR /app

# ENV FLASK_APP=/app/src/app.py
# ENV FLASK_ENV=development
# ENV FLASK_APP_KEY="any key works"
# ENV DATABASE_URL=postgresql+psycopg2://myuser:mypassword@db/todoapp

# COPY ./entrypoint.sh /usr/local/bin/
COPY ./entrypoint.sh /app/entrypoint.sh
COPY ./migrations /app/src/migrations
COPY ./src/requirements.txt /app/src/requirements.txt

RUN pip install -r /app/src/requirements.txt

COPY . /app

# CMD [ "python", "app.py" ]
# RUN chmod +x /usr/local/bin/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
# CMD ["/app/src/entrypoint.sh"]
CMD ["/app/entrypoint.sh"]