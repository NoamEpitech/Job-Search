FROM python:3.8

WORKDIR /app

COPY ./api/requirements.txt /app/

RUN pip install -r requirements.txt

COPY ./api/* /app/

EXPOSE 5000

CMD ["python", "main.py"]