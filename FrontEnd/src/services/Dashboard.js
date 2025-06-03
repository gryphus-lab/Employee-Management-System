import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const deptData = Object.entries(byDepartment).map(([name, value]) => ({
  name,
  value
}));

<PieChart width={400} height={300}>
  <Pie
    data={deptData}
    dataKey="value"
    nameKey="name"
    cx="50%"
    cy="50%"
    outerRadius={100}
    fill="#8884d8"
    label
  >
    {deptData.map((_, index) => (
      <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
    ))}
  </Pie>
  <Tooltip />
  <Legend />
</PieChart>
