class Bench < ActiveRecord::Base
  def self.in_bounds(bounds)
    ne_lat_bound = bounds["northEast"]["lat"].to_f
    ne_long_bound = bounds["northEast"]["lng"].to_f
    sw_lat_bound = bounds["southWest"]["lat"].to_f
    sw_long_bound = bounds["southWest"]["lng"].to_f
    Bench.where(<<-QSTRING, sw_lat_bound, ne_lat_bound, sw_long_bound, ne_long_bound);
      lat BETWEEN ? AND ? AND
      lng BETWEEN ? AND ?
    QSTRING
  end
end
