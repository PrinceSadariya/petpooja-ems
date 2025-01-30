const { pool } = require("../config/db");

const departmentWiseMaxSalary = async () => {
	const query = `
        SELECT 
            d.name,
            COALESCE(MAX(e.salary), 0) AS highestSalary
        FROM department d
        LEFT JOIN employee e ON d.id = e.department_id AND e.status = 1
        WHERE d.status = 1
        GROUP BY d.id, d.name
    `;

	const [rows] = await pool.promise().query(query);
	return rows;
};

const salaryRangeWiseCount = async () => {
	// with this query we are getting count 0 if no employees in that range
	const query = `
    SELECT 
            salaryRange,
            COUNT(e.id) AS employeeCount
            FROM (
            SELECT '0-25000' AS salaryRange
            UNION ALL
            SELECT '25001-50000'
            UNION ALL
            SELECT '50001-75000'
            UNION ALL
            SELECT '75001-100000'
            UNION ALL
            SELECT '100000+' 
            ) AS ranges
            LEFT JOIN employee e ON (
            (e.salary BETWEEN 0 AND 25000 AND salaryRange = '0-25000') OR
            (e.salary BETWEEN 25001 AND 50000 AND salaryRange = '25001-50000') OR
            (e.salary BETWEEN 50001 AND 75000 AND salaryRange = '50001-75000') OR
            (e.salary BETWEEN 75001 AND 100000 AND salaryRange = '75001-100000') OR
            (e.salary > 100000 AND salaryRange = '100000+')
            ) 
            AND e.status = 1
            GROUP BY salaryRange
            ORDER BY 
            CASE
                WHEN salaryRange = '0-25000' THEN 1
                WHEN salaryRange = '25001-50000' THEN 2
                WHEN salaryRange = '50001-75000' THEN 3
                WHEN salaryRange = '75001-100000' THEN 4
                ELSE 5
                END;
                `;
	// const query = `
	//     SELECT
	//         CASE
	//             WHEN salary BETWEEN 0 AND 25000 THEN '0-25000'
	//             WHEN salary BETWEEN 25001 AND 50000 THEN '25001-50000'
	//             WHEN salary BETWEEN 50001 AND 75000 THEN '50001-75000'
	//             WHEN salary BETWEEN 75001 AND 100000 THEN '75001-100000'
	//             ELSE '100000+'
	//         END AS salaryRange,
	//         COUNT(*) AS employeeCount
	//     FROM employee
	//     WHERE status = 1
	//     GROUP BY salaryRange
	//     ORDER BY MIN(salary)
	// `;

	const [rows] = await pool.promise().query(query);
	return rows;
};

const departmentWiseYoungestEmployee = async () => {
	const query = `
        SELECT 
            d.name AS departmentName,
            e.name AS employeeName,
            CONCAT(
                TIMESTAMPDIFF(YEAR, e.dob, CURDATE()), ' years ',
                TIMESTAMPDIFF(MONTH, e.dob, CURDATE()) % 12, ' months ',
                TIMESTAMPDIFF(DAY, DATE_ADD(e.dob, INTERVAL TIMESTAMPDIFF(MONTH, e.dob, CURDATE()) MONTH), CURDATE()), ' days'
            ) AS age
        FROM department d
        LEFT JOIN employee e ON d.id = e.department_id AND e.status = 1
        WHERE e.dob = (
            SELECT MIN(e2.dob) 
            FROM employee e2 
            WHERE e2.department_id = d.id AND e2.status = 1
        )
        ORDER BY d.id, age DESC;
    `;

	const [rows] = await pool.promise().query(query);

	return rows;
};

const statsService = {
	departmentWiseMaxSalary,
	salaryRangeWiseCount,
	departmentWiseYoungestEmployee,
};
module.exports = statsService;
