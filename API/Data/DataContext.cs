using System;
using API.Enities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
     public DbSet<AppUser> Users { get; set; }
     public DbSet<UserLike> Likes { get; set; }

     protected override void OnModelCreating(ModelBuilder builder)
     {
          base.OnModelCreating(builder);

          builder.Entity<UserLike>()
              .HasKey(k => new { k.SourceUserId, k.TargetUserId });

          builder.Entity<UserLike>()
              .HasOne(s => s.SourceUser)
              .WithMany(l => l.LikedUsers)
              .HasForeignKey(s => s.SourceUserId)
              .OnDelete(DeleteBehavior.Cascade);

          builder.Entity<UserLike>()
              .HasOne(s => s.TargetUser)
              .WithMany(l => l.LikeByUsers)
              .HasForeignKey(s => s.TargetUserId)
              .OnDelete(DeleteBehavior.Cascade);
     }
}
