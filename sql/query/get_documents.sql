select f.file_id,
  f.file_name,
  f.file_extension,
  d.document_created_at,
  u.user_username as receiver,
  c.correspondent_name as sender
from files as f
  join documents as d on d.document_id = f.document_id
  join users as u on u.user_id = d.user_id
  join correspondents as c on c.correspondent_id = d.correspondent_id
limit $1 offset ($2 - 1) * $1;
-- ===============================================================
select d.department_name,
  b.branch_name,
  b.branch_is_main
from departments as d
  join branches as b on b.branch_id = d.branch_id
where b.branch_id = 1;
-- ===================================================================
select b.branch_id,
  b.branch_name,
  b.branch_is_main
from branches as b;
-- =====================================================
select u.user_username,
  u.user_password,
  u.user_gender,
  u.user_created_at
from users