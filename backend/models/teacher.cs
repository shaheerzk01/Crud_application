using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics.Contracts;
using System.Net.NetworkInformation;
namespace Lab6.model
{
	public class teacher
	{
		public int teacherid { get; set; }
		public string teachername { get; set; }
		public string contact { get; set; }
		public string email { get; set; }

        public DataTable teacher_getall(int teacherid)
        {
            SqlCommand sc = new SqlCommand("teacher_get", ConnectionString.GetConnection());
            sc.CommandType = System.Data.CommandType.StoredProcedure;
            sc.Parameters.AddWithValue("@ParamTable1", teacherid);
            DataTable dt = new DataTable();
            SqlDataReader sdr = sc.ExecuteReader();
            dt.Load(sdr);
            sdr.Close();
            return dt;
        }
        public void insertall_teacher(int teacherid, string teachername, string contact, string email)
        {
            SqlCommand command = new SqlCommand("insert_teacher", ConnectionString.GetConnection());
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@teacherid", teacherid);
            command.Parameters.AddWithValue("@teachername", teachername);
            command.Parameters.AddWithValue("@contact", contact);
            command.Parameters.AddWithValue("@email", email);
            command.ExecuteNonQuery();

        }

        public void deleteall_teacher(int teacherid)
        {
            SqlCommand sc = new SqlCommand("delete_teacher", ConnectionString.GetConnection());
            sc.CommandType = System.Data.CommandType.StoredProcedure;
            sc.Parameters.AddWithValue("@ParamTable1", teacherid);
            sc.ExecuteNonQuery();
        }

        public void updateall_teacher(int teacherid, string teachername, string contact, string email)
        {
            SqlCommand sc = new SqlCommand("update_teacher", ConnectionString.GetConnection());
            sc.CommandType = System.Data.CommandType.StoredProcedure;
            sc.Parameters.AddWithValue("@teacherid", teacherid);
            sc.Parameters.AddWithValue("@teachername", teachername);
            sc.Parameters.AddWithValue("@contact", contact);
            sc.Parameters.AddWithValue("@email", email);
            sc.ExecuteNonQuery();
        }

    }
}

