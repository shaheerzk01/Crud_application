using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics.Contracts;
using System.Net.NetworkInformation;
namespace Lab6.model
{
	public class Room
	{
		public int room_id { get; set; }
		public int capacity { get; set; }
		public string room_no { get; set; }

		public DataTable get_room(int room_id)
		{
			SqlCommand sc = new SqlCommand("get_room", ConnectionString.GetConnection());
			sc.CommandType = System.Data.CommandType.StoredProcedure;
			sc.Parameters.AddWithValue("@paramtable1", room_id);
			DataTable dt = new DataTable();
			SqlDataReader sdr = sc.ExecuteReader();
			dt.Load(sdr);
			sdr.Close();
			return dt;
		}

		public void room_insert(int room_id, int capacity, string room_no)
		{
			SqlCommand sc = new SqlCommand("insert_room", ConnectionString.GetConnection());
			sc.CommandType = System.Data.CommandType.StoredProcedure;
			sc.Parameters.AddWithValue("@room_id", room_id);
			sc.Parameters.AddWithValue("@capacity", capacity);
			sc.Parameters.AddWithValue("@room_no", room_no);
			sc.ExecuteNonQuery();
		}

		public void room_update(int room_id, int capacity, string room_no)
		{
            SqlCommand sc = new SqlCommand("update_room", ConnectionString.GetConnection());
            sc.CommandType = System.Data.CommandType.StoredProcedure;
            sc.Parameters.AddWithValue("@room_id", room_id);
            sc.Parameters.AddWithValue("@capacity", capacity);
            sc.Parameters.AddWithValue("@room_no", room_no);
            sc.ExecuteNonQuery();
        }

		public void delete_room(int room_id)
		{
			SqlCommand sc = new SqlCommand("delete_room", ConnectionString.GetConnection());
			sc.CommandType = System.Data.CommandType.StoredProcedure;
			sc.Parameters.AddWithValue("@paramtable", room_id);
			sc.ExecuteNonQuery();
		}

	}
}

