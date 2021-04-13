select u.user_id,
  u.user_username,
  u.user_gender,
  s.staff_role as user_role,
  b.branch_name,
  d.department_name
from staff as s
  join users as u on u.user_id = s.user_id
  join departments as d on d.department_id = s.department_id
  join branches as b on b.branch_id = d.branch_id
where b.branch_id = 1;
-- limit $1 offset ($2 - 1) * $1;