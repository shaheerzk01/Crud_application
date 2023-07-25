using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics.Contracts;
using System.Net.NetworkInformation;
namespace Lab6.model
{
	public class course
	{
		public int COURSE_ID { get; set; }

		public string COURSE_NAME { get; set; }

		public string COURSE_CODE { get; set; }

		public string SHORT_NAME { get; set; }

        public DataTable Course_GetAll(int COURSE_ID)
        {
            SqlCommand sc = new SqlCommand("Course_GetAll", ConnectionString.GetConnection());
            sc.CommandType = System.Data.CommandType.StoredProcedure;
            sc.Parameters.AddWithValue("@ParamTable1", COURSE_ID);
            DataTable dt = new DataTable();
            SqlDataReader sdr = sc.ExecuteReader();
            dt.Load(sdr);
            sdr.Close();
            return dt;
        }

        public void insert_course(int COURSE_ID, string COURSE_NAME, string COURSE_CODE, string SHORT_NAME)
        {
            SqlCommand command = new SqlCommand("insert_course", ConnectionString.GetConnection());
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@COURSE_ID", COURSE_ID);
            command.Parameters.AddWithValue("@COURSE_NAME", COURSE_NAME);
            command.Parameters.AddWithValue("@COURSE_CODE", COURSE_CODE);
            command.Parameters.AddWithValue("@SHORT_NAME", SHORT_NAME);
            command.ExecuteNonQuery();

        }

        public void delete_course(int COURSE_ID)
        {
            SqlCommand sc = new SqlCommand("delete_course", ConnectionString.GetConnection());
            sc.CommandType = System.Data.CommandType.StoredProcedure;
            sc.Parameters.AddWithValue("@ParamTable1", COURSE_ID);
            sc.ExecuteNonQuery();
        }

        public void update_course(int COURSE_ID, string COURSE_NAME, string COURSE_CODE, string SHORT_NAME)
        {
            SqlCommand sc = new SqlCommand("UpdateCourse", ConnectionString.GetConnection());
            sc.CommandType = System.Data.CommandType.StoredProcedure;
            sc.Parameters.AddWithValue("@COURSE_ID", COURSE_ID);
            sc.Parameters.AddWithValue("@COURSE_NAME", COURSE_NAME);
            sc.Parameters.AddWithValue("@COURSE_CODE", COURSE_CODE);
            sc.Parameters.AddWithValue("@SHORT_NAME", SHORT_NAME);
            sc.ExecuteNonQuery();
        }


    }
}

