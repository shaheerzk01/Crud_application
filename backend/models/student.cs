using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics.Contracts;
using System.Net.NetworkInformation;

namespace Lab6.model
{
	public class Student
	{
		public int studentid { get; set; }

		public string studentregno { get; set; }

		public string studentname { get; set;}

		public string CONTACT { get; set; }

        public string EMAIL { get; set; }

        public string Status { get; set; }

        public string ReturnMessage { get; set; }

        public DataTable Students_GetAll(string Status, IConfiguration configuration)
        {
            DataTable dt = new DataTable();
            SqlDataReader sdr;
            using (SqlConnection connection = new SqlConnection(configuration.GetConnectionString("AttendanceAppCon")))
            {
                connection.Open();
                using (SqlCommand sc = new SqlCommand("Student_GetAll", connection))
                {
                    sc.CommandType = CommandType.StoredProcedure;
                    sc.Parameters.AddWithValue("@ParamTable1", Status);
                    sdr = sc.ExecuteReader();
                    dt.Load(sdr);
                    connection.Close();
                }
            }
            return dt;

            //SqlCommand sc = new SqlCommand("Student_GetAll", ConnectionString.GetConnection());
            //sc.CommandType = System.Data.CommandType.StoredProcedure;
            //sc.Parameters.AddWithValue("@ParamTable1", studentid);
            //DataTable dt = new DataTable();
            //SqlDataAdapter sda = new SqlDataAdapter(sc);
            //sda.Fill(dt);
            //return dt;
        }
        //public Student Student_Save(Student student)
        //{
        //    SqlCommand sc = new SqlCommand("", ConnectionString.GetConnection());
        //    sc.CommandType = CommandType.StoredProcedure;
        //    sc.Parameters.AddWithValue("@ParamTable1", student);
        //    if (sc.ExecuteNonQuery() > 0)
        //    {
        //        student.ReturnMessage = "OK";
        //    }
        //    return student;
        //}

        public void insert_student(int studentid, string studentname, string CONATCT, string EMAIL, string studentregno, string status)
        {
            SqlCommand command = new SqlCommand("insert_student", ConnectionString.GetConnection());
            command.CommandType = System.Data.CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@studentid", studentid);
            command.Parameters.AddWithValue("@studentname", studentname);
            command.Parameters.AddWithValue("@CONTACT", CONATCT);
            command.Parameters.AddWithValue("@EMAIL", EMAIL);
            command.Parameters.AddWithValue("@studentregno", studentregno);
            command.Parameters.AddWithValue("@Status", status);
            command.ExecuteNonQuery();

        }

        public void delete_student(int studentid)
        {
            SqlCommand sc = new SqlCommand("delete_student", ConnectionString.GetConnection());
            sc.CommandType = System.Data.CommandType.StoredProcedure;
            sc.Parameters.AddWithValue("@ParamTable1", studentid);
            sc.ExecuteNonQuery();
        }

        public void update_student(int studentid, string studentname, string studentregno, string CONTACT, string EMAIL)
        {
            SqlCommand sc = new SqlCommand("UpdateStudent", ConnectionString.GetConnection());
            sc.CommandType = System.Data.CommandType.StoredProcedure;
            sc.Parameters.AddWithValue("@studentId", studentid);
            sc.Parameters.AddWithValue("@studentname", studentname);
            sc.Parameters.AddWithValue("@studentregno", studentregno);
            sc.Parameters.AddWithValue("@CONTACT", CONTACT);
            sc.Parameters.AddWithValue("@EMAIL", EMAIL);
            sc.ExecuteNonQuery();
        }


    }
}

