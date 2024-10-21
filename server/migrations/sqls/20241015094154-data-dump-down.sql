--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-05-21 20:41:00

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16409)
-- Name: przepis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.przepis (
    id_przepisu integer NOT NULL,
    tytul text NOT NULL,
    opis text NOT NULL,
    czas_przygotowania numeric,
    cena numeric,
    wyswietlenia integer,
    autor integer NOT NULL,
    zdjecie text,
    data_publikacji date NOT NULL
);


ALTER TABLE public.przepis OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16408)
-- Name: Przepis_id_przepisu_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Przepis_id_przepisu_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Przepis_id_przepisu_seq" OWNER TO postgres;

--
-- TOC entry 4933 (class 0 OID 0)
-- Dependencies: 217
-- Name: Przepis_id_przepisu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Przepis_id_przepisu_seq" OWNED BY public.przepis.id_przepisu;


--
-- TOC entry 222 (class 1259 OID 16449)
-- Name: artykul; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.artykul (
    id_artykulu integer NOT NULL,
    tytul text NOT NULL,
    opis text NOT NULL,
    zdjecie bytea,
    autor integer NOT NULL,
    data_publikacji date
);


ALTER TABLE public.artykul OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16448)
-- Name: artykul_id_artykulu_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.artykul_id_artykulu_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.artykul_id_artykulu_seq OWNER TO postgres;

--
-- TOC entry 4934 (class 0 OID 0)
-- Dependencies: 221
-- Name: artykul_id_artykulu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.artykul_id_artykulu_seq OWNED BY public.artykul.id_artykulu;


--
-- TOC entry 231 (class 1259 OID 16542)
-- Name: komentarz; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.komentarz (
    id_komentarza integer NOT NULL,
    opis text NOT NULL,
    id_uzytkownika integer NOT NULL,
    id_artykulu integer,
    id_przepisu integer
);


ALTER TABLE public.komentarz OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16541)
-- Name: komentarz_id_komentarza_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.komentarz_id_komentarza_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.komentarz_id_komentarza_seq OWNER TO postgres;

--
-- TOC entry 4935 (class 0 OID 0)
-- Dependencies: 230
-- Name: komentarz_id_komentarza_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.komentarz_id_komentarza_seq OWNED BY public.komentarz.id_komentarza;


--
-- TOC entry 220 (class 1259 OID 16435)
-- Name: plan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan (
    id_uzytkownika integer NOT NULL,
    data date NOT NULL,
    id_przepisu integer NOT NULL
);


ALTER TABLE public.plan OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16472)
-- Name: skladnik; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skladnik (
    id_skladnik integer NOT NULL,
    nazwa text NOT NULL,
    cena numeric
);


ALTER TABLE public.skladnik OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16471)
-- Name: skladnik_id_skladnik_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.skladnik_id_skladnik_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.skladnik_id_skladnik_seq OWNER TO postgres;

--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 224
-- Name: skladnik_id_skladnik_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.skladnik_id_skladnik_seq OWNED BY public.skladnik.id_skladnik;


--
-- TOC entry 223 (class 1259 OID 16463)
-- Name: skladnik_w_lodowce; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skladnik_w_lodowce (
    id_uzytkownika integer NOT NULL,
    id_skladnik integer NOT NULL
);


ALTER TABLE public.skladnik_w_lodowce OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16504)
-- Name: skladnik_w_przepisie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skladnik_w_przepisie (
    id_przepisu integer NOT NULL,
    id_skladnika integer NOT NULL,
    ilosc text
);


ALTER TABLE public.skladnik_w_przepisie OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16520)
-- Name: tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag (
    id_tagu integer NOT NULL,
    nazwa text NOT NULL
);


ALTER TABLE public.tag OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16519)
-- Name: tag_id_tagu_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tag_id_tagu_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tag_id_tagu_seq OWNER TO postgres;

--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 227
-- Name: tag_id_tagu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tag_id_tagu_seq OWNED BY public.tag.id_tagu;


--
-- TOC entry 229 (class 1259 OID 16528)
-- Name: tag_w_przepisie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag_w_przepisie (
    id_tagu integer,
    id_przepisu integer
);


ALTER TABLE public.tag_w_przepisie OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16422)
-- Name: ulubione; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ulubione (
    id_przepisu integer NOT NULL,
    id_uzytkownika integer NOT NULL
);


ALTER TABLE public.ulubione OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16400)
-- Name: uzytkownik; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uzytkownik (
    id_uzytkownika integer NOT NULL,
    imie character varying(50) NOT NULL,
    nazwisko character varying(50) NOT NULL,
    haslo character varying(200) NOT NULL,
    email character varying(100) NOT NULL
);


ALTER TABLE public.uzytkownik OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: uzytkownik_id_uzytkownika_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.uzytkownik_id_uzytkownika_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.uzytkownik_id_uzytkownika_seq OWNER TO postgres;

--
-- TOC entry 4938 (class 0 OID 0)
-- Dependencies: 215
-- Name: uzytkownik_id_uzytkownika_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.uzytkownik_id_uzytkownika_seq OWNED BY public.uzytkownik.id_uzytkownika;


--
-- TOC entry 4735 (class 2604 OID 16452)
-- Name: artykul id_artykulu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artykul ALTER COLUMN id_artykulu SET DEFAULT nextval('public.artykul_id_artykulu_seq'::regclass);


--
-- TOC entry 4738 (class 2604 OID 16545)
-- Name: komentarz id_komentarza; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.komentarz ALTER COLUMN id_komentarza SET DEFAULT nextval('public.komentarz_id_komentarza_seq'::regclass);


--
-- TOC entry 4734 (class 2604 OID 16412)
-- Name: przepis id_przepisu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.przepis ALTER COLUMN id_przepisu SET DEFAULT nextval('public."Przepis_id_przepisu_seq"'::regclass);


--
-- TOC entry 4736 (class 2604 OID 16475)
-- Name: skladnik id_skladnik; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skladnik ALTER COLUMN id_skladnik SET DEFAULT nextval('public.skladnik_id_skladnik_seq'::regclass);


--
-- TOC entry 4737 (class 2604 OID 16523)
-- Name: tag id_tagu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag ALTER COLUMN id_tagu SET DEFAULT nextval('public.tag_id_tagu_seq'::regclass);


--
-- TOC entry 4733 (class 2604 OID 16403)
-- Name: uzytkownik id_uzytkownika; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uzytkownik ALTER COLUMN id_uzytkownika SET DEFAULT nextval('public.uzytkownik_id_uzytkownika_seq'::regclass);


--
-- TOC entry 4939 (class 0 OID 0)
-- Dependencies: 217
-- Name: Przepis_id_przepisu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Przepis_id_przepisu_seq"', 1, true);


--
-- TOC entry 4940 (class 0 OID 0)
-- Dependencies: 221
-- Name: artykul_id_artykulu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.artykul_id_artykulu_seq', 1, false);


--
-- TOC entry 4941 (class 0 OID 0)
-- Dependencies: 230
-- Name: komentarz_id_komentarza_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.komentarz_id_komentarza_seq', 1, false);


--
-- TOC entry 4942 (class 0 OID 0)
-- Dependencies: 224
-- Name: skladnik_id_skladnik_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.skladnik_id_skladnik_seq', 1, false);


--
-- TOC entry 4943 (class 0 OID 0)
-- Dependencies: 227
-- Name: tag_id_tagu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tag_id_tagu_seq', 3, true);


--
-- TOC entry 4944 (class 0 OID 0)
-- Dependencies: 215
-- Name: uzytkownik_id_uzytkownika_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.uzytkownik_id_uzytkownika_seq', 36, true);


--
-- TOC entry 4744 (class 2606 OID 16416)
-- Name: przepis Przepis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.przepis
    ADD CONSTRAINT "Przepis_pkey" PRIMARY KEY (id_przepisu);


--
-- TOC entry 4746 (class 2606 OID 16456)
-- Name: artykul artykul_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artykul
    ADD CONSTRAINT artykul_pkey PRIMARY KEY (id_artykulu);


--
-- TOC entry 4752 (class 2606 OID 16549)
-- Name: komentarz komentarz_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.komentarz
    ADD CONSTRAINT komentarz_pkey PRIMARY KEY (id_komentarza);


--
-- TOC entry 4748 (class 2606 OID 16479)
-- Name: skladnik skladnik_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skladnik
    ADD CONSTRAINT skladnik_pkey PRIMARY KEY (id_skladnik);


--
-- TOC entry 4750 (class 2606 OID 16527)
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id_tagu);


--
-- TOC entry 4740 (class 2606 OID 16407)
-- Name: uzytkownik uzytkownik_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uzytkownik
    ADD CONSTRAINT uzytkownik_email_key UNIQUE (email);


--
-- TOC entry 4742 (class 2606 OID 16405)
-- Name: uzytkownik uzytkownik_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uzytkownik
    ADD CONSTRAINT uzytkownik_pkey PRIMARY KEY (id_uzytkownika);


--
-- TOC entry 4753 (class 2606 OID 16417)
-- Name: przepis autor_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.przepis
    ADD CONSTRAINT "autor_FK" FOREIGN KEY (autor) REFERENCES public.uzytkownik(id_uzytkownika) NOT VALID;


--
-- TOC entry 4765 (class 2606 OID 16560)
-- Name: komentarz id_artykulu_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.komentarz
    ADD CONSTRAINT "id_artykulu_FK" FOREIGN KEY (id_artykulu) REFERENCES public.artykul(id_artykulu);


--
-- TOC entry 4754 (class 2606 OID 16425)
-- Name: ulubione id_przepisu_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ulubione
    ADD CONSTRAINT "id_przepisu_FK" FOREIGN KEY (id_przepisu) REFERENCES public.przepis(id_przepisu);


--
-- TOC entry 4756 (class 2606 OID 16443)
-- Name: plan id_przepisu_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT "id_przepisu_FK" FOREIGN KEY (id_przepisu) REFERENCES public.przepis(id_przepisu);


--
-- TOC entry 4761 (class 2606 OID 16509)
-- Name: skladnik_w_przepisie id_przepisu_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skladnik_w_przepisie
    ADD CONSTRAINT "id_przepisu_FK" FOREIGN KEY (id_przepisu) REFERENCES public.przepis(id_przepisu) NOT VALID;


--
-- TOC entry 4763 (class 2606 OID 16536)
-- Name: tag_w_przepisie id_przepisu_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag_w_przepisie
    ADD CONSTRAINT "id_przepisu_FK" FOREIGN KEY (id_przepisu) REFERENCES public.przepis(id_przepisu);


--
-- TOC entry 4766 (class 2606 OID 16555)
-- Name: komentarz id_przepisu_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.komentarz
    ADD CONSTRAINT "id_przepisu_FK" FOREIGN KEY (id_przepisu) REFERENCES public.przepis(id_przepisu);


--
-- TOC entry 4759 (class 2606 OID 24782)
-- Name: skladnik_w_lodowce id_skladnik; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skladnik_w_lodowce
    ADD CONSTRAINT id_skladnik FOREIGN KEY (id_uzytkownika) REFERENCES public.uzytkownik(id_uzytkownika) NOT VALID;


--
-- TOC entry 4762 (class 2606 OID 16514)
-- Name: skladnik_w_przepisie id_skladnika_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skladnik_w_przepisie
    ADD CONSTRAINT "id_skladnika_FK" FOREIGN KEY (id_skladnika) REFERENCES public.skladnik(id_skladnik) NOT VALID;


--
-- TOC entry 4764 (class 2606 OID 16531)
-- Name: tag_w_przepisie id_tagu_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag_w_przepisie
    ADD CONSTRAINT "id_tagu_FK" FOREIGN KEY (id_tagu) REFERENCES public.tag(id_tagu);


--
-- TOC entry 4755 (class 2606 OID 16430)
-- Name: ulubione id_uzytkownika_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ulubione
    ADD CONSTRAINT "id_uzytkownika_FK" FOREIGN KEY (id_uzytkownika) REFERENCES public.uzytkownik(id_uzytkownika);


--
-- TOC entry 4757 (class 2606 OID 16438)
-- Name: plan id_uzytkownika_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT "id_uzytkownika_FK" FOREIGN KEY (id_uzytkownika) REFERENCES public.uzytkownik(id_uzytkownika);


--
-- TOC entry 4758 (class 2606 OID 16457)
-- Name: artykul id_uzytkownika_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artykul
    ADD CONSTRAINT "id_uzytkownika_FK" FOREIGN KEY (autor) REFERENCES public.uzytkownik(id_uzytkownika);


--
-- TOC entry 4760 (class 2606 OID 16499)
-- Name: skladnik_w_lodowce id_uzytkownika_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skladnik_w_lodowce
    ADD CONSTRAINT "id_uzytkownika_FK" FOREIGN KEY (id_uzytkownika) REFERENCES public.uzytkownik(id_uzytkownika) NOT VALID;


--
-- TOC entry 4767 (class 2606 OID 16550)
-- Name: komentarz id_uzytkownika_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.komentarz
    ADD CONSTRAINT "id_uzytkownika_FK" FOREIGN KEY (id_uzytkownika) REFERENCES public.uzytkownik(id_uzytkownika);


-- Completed on 2024-05-21 20:41:01

--
-- PostgreSQL database dump complete
--

