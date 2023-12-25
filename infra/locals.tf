locals {
  database_url = digitalocean_database_connection_pool.demo_sentry_db.uri
  direct_url   = digitalocean_database_cluster.demo_sentry_db.uri
  redis_url    = digitalocean_database_cluster.demo_sentry_redis.uri
  db_replicas  = jsonencode(
    tolist([
      digitalocean_database_replica.demo_sentry_db_1.uri,
      digitalocean_database_replica.demo_sentry_db_2.uri
    ])
  )

}

locals {
  zone                 = "iprice.run"
  connection_pool_size = 22
}
