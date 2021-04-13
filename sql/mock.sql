insert into users (user_username, user_password, user_gender)
values ('malika', 'utrujjah', 'f'),
  ('dilbar', 'roseprincess', 'f');
insert into branches (branch_name)
values ('chilonzor'),
  ('olmazor');
insert into departments (department_name, branch_id)
values ('dasturchilar', 1),
  ('smm', 2);
insert into staff (staff_role, user_id, department_id)
values ('s', 1, 1),
  ('s', 2, 2);
insert into correspondents (correspondent_name, correspondent_date)
values ('muhammadxon', '2021-04-07');
insert into documents (user_id, correspondent_id)
values (1, 1),
  (2, 1);
insert into files (file_name, file_extension, document_id)
values ('Misrga 2 kishilik yo''llanma', 'doc', 1),
  ('Makkaga 2 kishilik yo''llanma', 'doc', 2);
insert into circle (
    cirlce_accept,
    document_id,
    receiver_id,
    sender_id
  )
values ('2021-04-07', 1, 2, 1),
  ('2021-04-07', 2, 1, 2);
  gatewaydan service_id ni olamiz uni pg dan olib yozamiz;


  --todo
    -- server_id int not null (users tablega qoshilish kerak),
    --post zapros yaratilib gatewaydan server_id ni va boshqa malumotlarni olamiz
    --post qilingandan keyin biz uni olib tokenni jwt b-n verify qilamiz
    --boshqa kegan malumotlarni olib pg ga yozamiz
    --users/:id qismida id ga server_id dan oladi(where server_id = $1);
    --barcha malummotlar microservicesdan emas, gatewaydan olinadi;
