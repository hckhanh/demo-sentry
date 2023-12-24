locals {
  direct_url = replace(
    digitalocean_database_cluster.demo_sentry_db.uri, "://:",
    format("://%s:", digitalocean_database_cluster.demo_sentry_db.user)
  )
}
