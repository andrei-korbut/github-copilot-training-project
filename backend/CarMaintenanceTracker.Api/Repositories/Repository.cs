using System.Linq.Expressions;
using CarMaintenanceTracker.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace CarMaintenanceTracker.Api.Repositories;

/// <summary>
/// Generic repository base class implementing common CRUD operations.
/// </summary>
/// <typeparam name="T">The entity type</typeparam>
public class Repository<T> : IRepository<T> where T : class
{
    protected readonly AppDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public Repository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    /// <inheritdoc/>
    public async Task<T?> GetByIdAsync(int id, params Expression<Func<T, object>>[]? includes)
    {
        if (includes == null || includes.Length == 0)
        {
            return await _dbSet.FindAsync(id);
        }

        IQueryable<T> query = _dbSet;
        foreach (var include in includes)
        {
            query = query.Include(include);
        }

        // Use a property named "Id" for filtering - assumes all entities have an Id property
        var parameter = Expression.Parameter(typeof(T), "e");
        var property = Expression.Property(parameter, "Id");
        var idConstant = Expression.Constant(id);
        var equals = Expression.Equal(property, idConstant);
        var lambda = Expression.Lambda<Func<T, bool>>(equals, parameter);

        return await query.FirstOrDefaultAsync(lambda);
    }

    /// <inheritdoc/>
    public async Task<IEnumerable<T>> GetAllAsync(
        Expression<Func<T, bool>>? filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
        params Expression<Func<T, object>>[]? includes)
    {
        IQueryable<T> query = _dbSet.AsNoTracking();

        if (includes != null)
        {
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
        }

        if (filter != null)
        {
            query = query.Where(filter);
        }

        if (orderBy != null)
        {
            return await orderBy(query).ToListAsync();
        }

        return await query.ToListAsync();
    }

    /// <inheritdoc/>
    public async Task<T> AddAsync(T entity)
    {
        _dbSet.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    /// <inheritdoc/>
    public async Task<T> UpdateAsync(T entity)
    {
        _dbSet.Update(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    /// <inheritdoc/>
    public async Task DeleteAsync(int id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
