import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { List, ListItem, ListItemText, Checkbox } from '@mui/material';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Department {
  department: string;
  sub_departments: string[];
}

const SecondPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));

    // Hardcoded department and sub-department data
    const hardcodedDepartments: Department[] = [
      {
        department: 'customer_service',
        sub_departments: ['support', 'customer_success'],
      },
      {
        department: 'design',
        sub_departments: ['graphic_design', 'product_design', 'web_design'],
      },
    ];

    setDepartments(hardcodedDepartments);
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];

  const handleToggle = (item: string) => {
    setSelected((prev) => {
      const index = prev.indexOf(item);
      if (index === -1) {
        // Item not in selected, add it
        return [...prev, item];
      } else {
        // Item already selected, remove it
        return prev.filter((selectedItem) => selectedItem !== item);
      }
    });
  
    // Check if the item is a department
    const department = departments.find((dept) => dept.department === item);
    if (department) {
      // If it's a department, select/unselect all its sub-departments
      const allSubDepartmentsSelected = department.sub_departments.every((subDept) =>
        selected.includes(subDept)
      );
  
      setSelected((prev) => {
        if (allSubDepartmentsSelected) {
          // If all sub-departments are selected, unselect all of them
          return prev.filter((selectedItem) => !department.sub_departments.includes(selectedItem));
        } else {
          // If not all sub-departments are selected, select all of them
          return [...prev, ...department.sub_departments];
        }
      });
  
      // If all sub-departments are selected, unselect the parent department as well
      setSelected((prev) =>
        allSubDepartmentsSelected
          ? prev.filter((selectedItem) => selectedItem !== department.department)
          : prev
      );
    } else {
      // If it's a sub-department, check if all sub-departments are selected
      const parentDepartment = departments.find((dept) =>
        dept.sub_departments.includes(item)
      );
      if (parentDepartment) {
        const allSubDepartmentsSelected = parentDepartment.sub_departments.every((subDept) =>
          selected.includes(subDept)
        );
        if (allSubDepartmentsSelected) {
          // If all sub-departments are selected, unselect the parent department
          setSelected((prev) => prev.filter((selectedItem) => selectedItem !== parentDepartment.department));
        }
      }
    }
  };

  return (
    <div>
      <h1>Second Page</h1>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={posts}
          columns={columns}
          rowsPerPageOptions={[5]}
          {...(null as any)}
        />
      </div>
      <List component="nav">
        {departments.map((dept) => (
          <div key={dept.department}>
            <ListItem button>
              <Checkbox
                checked={selected.includes(dept.department)}
                indeterminate={
                  selected.some((subDept) => dept.sub_departments.includes(subDept)) &&
                  !selected.includes(dept.department)
                }
                onChange={() => handleToggle(dept.department)}
              />
              <ListItemText primary={`${selected.includes(dept.department) ? '-' : ''} ${dept.department}`} />
            </ListItem>
            {dept.sub_departments.map((subDept) => (
              <ListItem key={subDept} button style={{ paddingLeft: '30px' }}>
                <Checkbox
                  checked={selected.includes(subDept)}
                  onChange={() => handleToggle(subDept)}
                />
                <ListItemText primary={`${selected.includes(subDept) ? '-' : ''} ${subDept}`} />
              </ListItem>
            ))}
          </div>
        ))}
      </List>
    </div>
  );
};

export default SecondPage;
