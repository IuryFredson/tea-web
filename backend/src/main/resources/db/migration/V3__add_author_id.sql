ALTER TABLE posts
    ADD COLUMN author_id UUID;

ALTER TABLE comments
    ADD COLUMN author_id UUID;
