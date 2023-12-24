resource "digitalocean_database_cluster" "demo_sentry_redis" {
  name             = "demo-sentry-redis"
  engine           = "redis"
  version          = "7"
  size             = "db-s-1vcpu-1gb"
  region           = "sgp1"
  node_count       = 1
  storage_size_mib = ""

  # https://docs.bullmq.io/guide/connections#:~:text=Make%20sure%20that,errors%20in%20BullMQ
  eviction_policy = "noeviction"

  private_network_uuid = digitalocean_vpc.network.id
  project_id           = digitalocean_project.demo_sentry.id
}

resource "digitalocean_database_firewall" "demo_sentry_redis" {
  cluster_id = digitalocean_database_cluster.demo_sentry_redis.id

  rule {
    type  = "app"
    value = digitalocean_app.demo_sentry.id
  }
}
