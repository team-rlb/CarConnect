
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;





CREATE TABLE public.cars (
    "_id" serial NOT NULL,
    "make" varchar NOT NULL,
    "model" varchar NOT NULL,
    CONSTRAINT "cars_pk" PRIMARY KEY ("_id")
) WITH (
    OIDS=FALSE
);

CREATE TABLE public.prices (
    "_id" serial NOT NULL,
    "year" integer NOT NULL,
    "date" varchar NOT NULL,
    "price" integer NOT NULL,
    "mileage" integer NOT NULL,
    "url" varchar NOT NULL,
    "car_id" bigint NOT NULL
    CONSTRAINT "prices_pk" PRIMARY KEY ("_id")
) WITH (
    OIDS=FALSE
);


ALTER TABLE public.prices ADD CONSTRAINT "cars_fk0" FOREIGN KEY ("car_id") REFERENCES  public.cars("_id");

INSERT INTO public.cars VALUES (1, 'Honda', 'Civic');
INSERT INTO public.prices VALUES (1, 2015, 2022-06-11, 20000, 10000, "https://www.cars.com/shopping/results/?stock_type=all&makes%5B%5D=honda&models%5B%5D=honda-civic&list_price_max=&maximum_distance=20&zip=11201", 1)