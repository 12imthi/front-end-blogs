import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import formatDate from '../../../utilis/formateDate';

// Format the data for the chart
const formatData = (blogs) => {
  return blogs.map(blog => ({
    name: formatDate(blog.createdAt),
    posts: blog.title.length,
    pageViews: blog.pageViews || 0,
    amt: blog.amt || 0
  }));
}

function BlogsChart({ blogs }) {
  const data = formatData(blogs);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="posts" fill="#8884d8" />
          <Bar dataKey="pageViews" fill="#82ca9d" />
          <Bar dataKey="amt" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BlogsChart;
