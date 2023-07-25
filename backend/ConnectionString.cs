using System;
using System.Data.SqlClient;

namespace Lab6
{
	public static class ConnectionString
	{
		public static SqlConnection mySqlConnection;

		public static SqlConnection GetConnection()
		{
			if(mySqlConnection == null)
			{
				mySqlConnection = new SqlConnection();
				mySqlConnection.ConnectionString = @"Data Source=localhost,1433;Initial Catalog=ATTENDENCE_SYSTEM;User Id=sa;Password=reallyStrongPwd123";
				mySqlConnection.Open();
			}
			return mySqlConnection;
		}
	}

	
}

