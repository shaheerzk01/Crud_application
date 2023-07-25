using System.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
namespace Lab6.Controllers
{
	[ApiController]
	[Route ("[Controller]")]
	public class RoomController : Controller
	{
		[HttpGet]
		public JsonResult get([FromQuery] int room_id)
		{
			return new JsonResult(new model.Room().get_room(room_id));
		}

		[HttpPost]
		public JsonResult post([FromBody] model.Room r)
		{
			new model.Room().room_insert(r.room_id, r.capacity, r.room_no);
			return new JsonResult("OK");
		}

		[HttpPut]
		public JsonResult put([FromBody] model.Room r)
		{
			new model.Room().room_update(r.room_id, r.capacity, r.room_no);
			return new JsonResult("OK");
		}

		[HttpDelete]
		public JsonResult delete([FromBody] model.Room r)
		{
			new model.Room().delete_room(r.room_id);
			return new JsonResult("OK");
		}

	}
}

