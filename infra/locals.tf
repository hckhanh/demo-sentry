locals {
  database_url = digitalocean_database_connection_pool.demo_sentry_db.uri
  direct_url   = digitalocean_database_cluster.demo_sentry_db.uri
  redis_url    = digitalocean_database_cluster.demo_sentry_redis.uri
  db_replicas  = jsonencode(
    [for i in digitalocean_database_replica.demo_sentry_db :  i.uri]
  )
  db_replicas_name = [for i in digitalocean_database_replica.demo_sentry_db :  i.name]
}
